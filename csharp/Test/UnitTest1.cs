namespace Test;

using Moq;

public class UnitTest1
{
    public class Subject(UnitTest1.Dependency dependency)
    {
        private readonly Dependency dependency = dependency;

        public int MyMethod()
        {
            return this.dependency.GetValueFromExternalSystem() + 30;
        }
    }

    public class Dependency
    {
        public virtual int GetValueFromExternalSystem()
        {
            return 5;
        }
    }

    [Fact]
    public void Test()
    {
        var mockDependency = new Mock<Dependency>();
        mockDependency.Setup(m => m.GetValueFromExternalSystem()).Returns(10);

        var subject = new Subject(mockDependency.Object);
        Assert.Equal(40, subject.MyMethod());
    }
}