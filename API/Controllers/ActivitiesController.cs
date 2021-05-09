using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // http://localhost:5000/api/v1/activities/
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities() => await Mediator.Send(new List.Query());

        [HttpGet("{id:guid}")]
        public async Task<Task<Activity>> GetActivity(Guid id) =>
            Mediator.Send(new Details.Query{Id = id});
    }
}