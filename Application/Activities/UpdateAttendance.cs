using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;

            public Handler(DataContext context, IUserAccessor accessor)
            {
                _context = context;
                _accessor = accessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(a => a.Id == request.Id);

                if (activity == null) return null;

                AppUser user = await
                    _context.Users.FirstOrDefaultAsync(u => u
                        .UserName == _accessor.GetUsername());

                if (user == null) return null;

                string hostName = activity.Attendees.FirstOrDefault(h => h.IsHost)?.AppUser?.UserName;

                ActivityAttendee attendence = activity.Attendees
                    .FirstOrDefault(u => u.AppUser.UserName == user.UserName);

                if (attendence != null && hostName == user.UserName)
                    activity.IsCanceled = !activity.IsCanceled;

                if (attendence != null && hostName != user.UserName)
                    activity.Attendees.Remove(attendence);

                if (attendence == null)
                {
                    attendence = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false,
                    };
                    
                    activity.Attendees.Add(attendence);
                }

                bool result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance.");
            }
        }
    }
}