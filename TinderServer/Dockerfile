FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["TinderServer/TinderServer.csproj", "TinderServer/"]
RUN dotnet restore "TinderServer/TinderServer.csproj"
COPY . .
WORKDIR "/src/TinderServer"
RUN dotnet build "TinderServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TinderServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TinderServer.dll"]
