# Build stage
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy only the project file and restore dependencies
COPY ["Boilerplate.csproj", "./"]
RUN dotnet restore "Boilerplate.csproj"

# Copy the rest of the source code
COPY . .

# Build and publish
RUN dotnet publish "Boilerplate.csproj" -c Release -o /app/publish --no-restore /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Use a non-root user for security
USER app

# Expose port
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80

# Copy the published app from the build stage
COPY --from=build /app/publish .

# Set the entry point for the application
ENTRYPOINT ["dotnet", "Boilerplate.dll"]