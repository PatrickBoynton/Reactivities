using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            
            switch (result.IsSuccess)
            {
                case true when result.Value != null:
                    return Ok(result.Value);
                case true when result.Value == null:
                    return NotFound();
                default:
                    return BadRequest(result.Error);
            }
        }
    }
}