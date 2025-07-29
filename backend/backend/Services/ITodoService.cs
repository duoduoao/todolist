using backend.Models; 
using System.Collections.Generic;

namespace backend.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();
    void Add(TodoItem item);
    bool Delete(Guid id);
}
