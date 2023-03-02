using Avatar.Shared.Models;
using AvatarNET.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AvatarNET.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public ProductsController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product productToCreate)
    {
        await _appDbContext.AddAsync(productToCreate);

        await _appDbContext.SaveChangesAsync();

        return Ok(productToCreate);
    }

    [HttpGet]
    public async Task<IEnumerable<Product>> Get()
    {
        return await _appDbContext.Products.ToListAsync();
    }

    [HttpPut]
    public async Task<IActionResult> Update(Product updatedProduct)
    {
        _appDbContext.Update(updatedProduct);

        await _appDbContext.SaveChangesAsync();

        return Ok(updatedProduct);
    }

    [HttpDelete]
    [Route("{productToDeleteId}")]
    public async Task<IActionResult> Update(string productToDeleteId)
    {
        var productToDelete = await _appDbContext.Products.FindAsync(productToDeleteId);

        _appDbContext.Remove(productToDelete);

        await _appDbContext.SaveChangesAsync();

        return NoContent();
    }
}