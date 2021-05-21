using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application
{
    public class Edit
    {
        public class Command:  IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Create.Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.Activity).SetValidator(new ActivityValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                Activity activity = await _context.Activities.FindAsync(request.Activity.Id);

                _mapper.Map(request.Activity, activity);

                bool result = await _context.SaveChangesAsync() > 0;

                return !result ? Result<Unit>.Failure("Failed to edit the activity.") : Result<Unit>.Success(Unit.Value);
            }
        }
    }
}