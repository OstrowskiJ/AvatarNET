using Avatar.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace AvatarNET.Server.Data;

public static class ModelBuilderExtensions
{
    public static void SeedData(this ModelBuilder modelBuilder)
    {
        SeedAvatarModelTableData(modelBuilder);
        
        SeedBackgroundTableData(modelBuilder);
        
        SeedPlanTableData(modelBuilder);
        
        SeedVoiceTableData(modelBuilder);
    }
    
    private static void SeedAvatarModelTableData(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<AvatarModel>()
            .HasData(new AvatarModel(Guid.Parse("AE4F603D-2015-46C4-BBC4-73BA5CEA7783"), "Ethan"));

        modelBuilder
            .Entity<AvatarModel>()
            .HasData(new AvatarModel(Guid.Parse("DF248A4F-9AB9-45C5-876A-1E5ADF70643B"), "Jason"));

        modelBuilder
            .Entity<AvatarModel>()
            .HasData(new AvatarModel(Guid.Parse("09AAC140-5066-4A8D-AACF-A3203A88562A"), "Will"));

        modelBuilder
            .Entity<AvatarModel>()
            .HasData(new AvatarModel(Guid.Parse("18B5CB25-9E98-409E-A4FE-59667C9ED3C3"), "Alisha"));

        modelBuilder
            .Entity<AvatarModel>()
            .HasData(new AvatarModel(Guid.Parse("638D2C38-25E8-43D6-8435-77B7C0537B81"), "Maia"));

        modelBuilder
            .Entity<AvatarModel>()
            .HasData(new AvatarModel(Guid.Parse("01A74D8B-28C9-465A-8E0E-76E6EBEB3A4E"), "Paige"));
    }
    
    private static void SeedBackgroundTableData(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Background>()
            .HasData(new Background(Guid.Parse("2ECFF033-AA87-4AD7-ADBD-1A3733907068"), "Green"));

        modelBuilder
            .Entity<Background>()
            .HasData(new Background(Guid.Parse("CD57FB2F-2840-4D19-9661-D5947CEE6C4D"), "Blue"));

        modelBuilder
            .Entity<Background>()
            .HasData(new Background(Guid.Parse("A84D4767-2521-462F-B47B-E2EB15865FD9"), "Red"));
    }
    
    private static void SeedPlanTableData(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Plan>()
            .HasData(new Plan(Guid.Parse("4B631F86-4E90-4FDB-BD3F-EA8B775B913E"), "Basic"));
    }
    
    
    private static void SeedVoiceTableData(ModelBuilder modelBuilder)
    {        
        modelBuilder
            .Entity<Voice>()
            .HasData(new Voice(Guid.Parse("FFD7FA43-9848-4763-8B4B-F5C8DB796E7A"), "Polish"));

        modelBuilder
            .Entity<Voice>()
            .HasData(new Voice(Guid.Parse("73ED61F0-FCB2-4B54-B0BC-82ED294BB7BD"), "English"));
    }
}