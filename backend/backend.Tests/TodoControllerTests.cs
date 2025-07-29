using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

using backend.Controllers;
using backend.Models;
using backend.Services;

namespace backend.Tests
{
    public class TodoControllerTests
    {
        private readonly Mock<ITodoService> _mockService;
        private readonly TodoController _controller;

        public TodoControllerTests()
        {
            _mockService = new Mock<ITodoService>();
            _controller = new TodoController(_mockService.Object);
        }

        [Fact]
        public void Get_ReturnsOkResult_WithTodoList()
        {
            // Arrange
            var todos = new List<TodoItem>
            {
                new TodoItem { Id = Guid.NewGuid(), Title = "Test 1" },
                new TodoItem { Id = Guid.NewGuid(), Title = "Test 2" }
            };

            _mockService.Setup(service => service.GetAll()).Returns(todos);

            // Act
            var result = _controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnList = Assert.IsAssignableFrom<IEnumerable<TodoItem>>(okResult.Value);
            Assert.Equal(2, System.Linq.Enumerable.Count(returnList));
        }

        [Fact]
        public void Post_ReturnsCreatedAtActionResult_WithCreatedItem()
        {
            // Arrange
            var newTodo = new TodoItem
            {
                Id = Guid.NewGuid(),
                Title = "New Todo"
            };

            _mockService.Setup(service => service.Add(It.IsAny<TodoItem>()));

            // Act
            var result = _controller.Post(newTodo);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(_controller.Get), createdResult.ActionName);
            Assert.Equal(newTodo, createdResult.Value);

            // Verify Add was called once
            _mockService.Verify(service => service.Add(newTodo), Times.Once);
        }

        [Fact]
        public void Delete_ExistingId_ReturnsNoContent()
        {
            // Arrange
            var existingId = Guid.NewGuid();
            _mockService.Setup(service => service.Delete(existingId)).Returns(true);

            // Act
            var result = _controller.Delete(existingId);

            // Assert
            Assert.IsType<NoContentResult>(result);
            _mockService.Verify(service => service.Delete(existingId), Times.Once);
        }

        [Fact]
        public void Delete_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var nonExistingId = Guid.NewGuid();
            _mockService.Setup(service => service.Delete(nonExistingId)).Returns(false);

            // Act
            var result = _controller.Delete(nonExistingId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
            _mockService.Verify(service => service.Delete(nonExistingId), Times.Once);
        }
    }
}
