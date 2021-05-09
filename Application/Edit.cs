using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Edit
    {
        public class Command:  IRequest
        {
            public Activity Activity { get; set; }
        }
        
        public class Handler : IRequestHandler<Create.Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            public async Task<Unit> Handle(Create.Command request, CancellationToken cancellationToken)
            {
                Activity activity = await _context.Activities.FindAsync(request.Activity.Id);

                activity.Title = request.Activity.Title ?? activity.Title;

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}