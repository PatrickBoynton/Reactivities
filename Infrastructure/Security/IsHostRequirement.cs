using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement { }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>, IAuthorizationRequirement
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _contextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor contextAccessor)
        {
            _dbContext = dbContext;
            _contextAccessor = contextAccessor;
        }
        
        protected override  Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            string userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if(userId == null) return Task.CompletedTask;

            Guid activityId = Guid.Parse(_contextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(k => k.Key == "id").Value?.ToString() ?? string.Empty);

            ActivityAttendee attendee =  _dbContext.ActivityAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(a => a.AppUserId == userId && a.ActivityId == activityId).Result;
            
            if(attendee == null) return Task.CompletedTask;
            
            if(attendee.IsHost) context.Succeed(requirement);
            
            return Task.CompletedTask;
        }
    }
}