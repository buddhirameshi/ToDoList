using Microsoft.Extensions.Logging;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoListApi.Models;
using ToDoListAPI.Repositories;
using ToDoListAPI.Services;
using System.Collections;

namespace ToDoApi.Tests.Services
{
    public class ToDoItemServiceTests
    {
        private readonly Mock<IRepository<ToDoItem>> _repositoryMock;
        private readonly Mock<ILogger<ToDoItemService>> _loggerMock;
        private readonly ToDoItemService _service;

        public ToDoItemServiceTests()
        {
            _repositoryMock = new Mock<IRepository<ToDoItem>>();
            _loggerMock = new Mock<ILogger<ToDoItemService>>();
            _service = new ToDoItemService(_repositoryMock.Object, _loggerMock.Object);
        }

        [Fact]
        public async Task AddItemAsync_ShouldReturnCreatedTask()
        {
            // Arrange
            var dto = new ToDoItem { Title = "Clean gutters", IsComplete = false,Effort=2 };
            var expected = new ToDoItem { Id = 1, Title = "Clean gutters", IsComplete = false, Effort = 2 };

            _repositoryMock
                .Setup(r => r.AddItemAsync(It.IsAny<ToDoItem>()))
                .ReturnsAsync(expected);

            // Act
            var result = await _service.AddItemAsync(dto);

            // Assert
            result.Should().BeEquivalentTo(expected,x=>x.ExcludingMissingMembers());
        }


        [Fact]
        public async Task UpdateItemAsync_ShouldReturnTrue_WhenTaskUpdated()
        {
            // Arrange
            var oldItem = new ToDoItem { Id=1,Title = "Clean gutters", IsComplete = true, Effort = 20 };
            var newItem = new ToDoItem { Id = 1, Title = "Clean gutters", IsComplete = false, Effort = 2 };


            _repositoryMock.Setup(r => r.GetItemByIdAsync(1)).ReturnsAsync(oldItem);
            _repositoryMock.Setup(r => r.UpdateItemAsync(newItem)).ReturnsAsync(true);



            // Act
            var result = await _service.UpdateItemAsync(newItem);

            // Assert
            result.Should().BeTrue();
        }



        [Fact]
        public async Task GetAllAsync_ShouldReturnToDoList()
        {
            // Arrange
            var expected = new List<ToDoItem>
            {
               new ToDoItem { Id = 1, Title = "Clean gutters", IsComplete = true, Effort = 20 },
               new ToDoItem { Id = 2, Title = "Watch TV", IsComplete = false, Effort = 2 },

            };

            _repositoryMock.Setup(r => r.GetAllItemsAsync()).ReturnsAsync(expected);
           

            // Act
            var result = await _service.GetAllItemsAsync();

            // Assert

            result.Should().HaveCount(2);
            //result.Should().BeEquivalentTo(expected);


        }

        [Fact]
        public async Task DeleteItemAsync_ShouldReturnFalse_WhenNotDeleted()
        {
            // Arrange
            var itemId = 1;
            var expected = new ToDoItem { Id = 2, Title = "Clean gutters", IsComplete = true, Effort = 20 };

            _repositoryMock.Setup(r => r.GetItemByIdAsync(1)).ReturnsAsync(expected);


            // Act
            var result = await _service.DeleteItemAsync(itemId);

            // Assert
            result.Should().BeFalse();


        }

        [Fact]
        public async Task DeleteItemAsync_ShouldReturnTrue_WhenDeleted()
        {
            // Arrange
            var itemId = 1;

            var expected = new ToDoItem { Id = 1, Title = "Clean gutters", IsComplete = true, Effort = 20 };
            _repositoryMock.Setup(r => r.GetItemByIdAsync(1)).ReturnsAsync(expected);
            _repositoryMock.Setup(r => r.DeleteItemAsync(1)).ReturnsAsync(true);


            // Act
            var result = await _service.DeleteItemAsync(itemId);

            // Assert
            result.Should().BeTrue();


        }

        [Fact]
        public async Task GetItemByIdAsync_ShouldReturnRequestedTask()
        {
            // Arrange
            var expected = new ToDoItem { Id=1,Title = "Clean gutters", IsComplete = true, Effort = 20 };

            _repositoryMock.Setup(r => r.GetItemByIdAsync(1)).ReturnsAsync(expected);


            // Act
            var result = await _service.GetItemByIdAsync(1);

            // Assert
            result.Should().BeEquivalentTo(expected);


        }


    }
}
