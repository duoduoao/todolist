using backend.Models;
using backend.Services;
using System.Collections.Concurrent;

namespace backend.Services;

public class TodoService : ITodoService
{
    private readonly ConcurrentDictionary<Guid, TodoItem> _items = new();

    public IEnumerable<TodoItem> GetAll() => _items.Values;

    public void Add(TodoItem item)
    {
        if (item.Id == Guid.Empty)
            item.Id = Guid.NewGuid();
        _items.TryAdd(item.Id, item);
    }

    public bool Delete(Guid id) => _items.TryRemove(id, out _);
}
