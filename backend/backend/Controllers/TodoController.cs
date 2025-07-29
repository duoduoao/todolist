using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public IActionResult Get() => Ok(_todoService.GetAll());

    [HttpPost]
    public IActionResult Post([FromBody] TodoItem item)
    {
        _todoService.Add(item);
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        if (_todoService.Delete(id))
            return NoContent();
        return NotFound();
    }
}
