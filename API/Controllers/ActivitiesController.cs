using System;
using System.Threading.Tasks;
using Application;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // http://localhost:5000/api/v1/activities/
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id) => HandleResult(await Mediator.Send(new Details.Query {Id = id}));

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) =>
            HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
        {
            activity.Id = activity.Id;
            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id) => HandleResult(await Mediator.Send(new Delete.Command {Id = id}));

        [HttpPost("{id}/attend")]
        private async Task<IActionResult> Attend(Guid id) => HandleResult(await Mediator.Send(new UpdateAttendance.Command {Id = id,}));
    }
}