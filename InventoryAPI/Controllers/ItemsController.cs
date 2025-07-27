using InventoryAPI.Data;
using InventoryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase{

        private readonly InventoryContext _context;

        public ItemsController(InventoryContext context){
            _context = context;
        }

        [HttpGet]   
        public async Task<ActionResult<IEnumerable<Item>>> GetItems(){

            return await _context.items.ToListAsync();
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<Item>> GetItem(int Id)
        {
            var item = await _context.items.FindAsync(Id);

            if(item == null)
            {
                return NotFound();
            }
            return item;
        }
        [HttpPost]
public async Task<ActionResult<Item>> PostItem(Item newItem)
{
    var existingItem = await _context.items
        .FirstOrDefaultAsync(i => i.Name.ToLower() == newItem.Name.ToLower());

    if (existingItem != null)
    {
        existingItem.Quantity += newItem.Quantity;
        existingItem.Price += newItem.Price;

        // ✅ Update remaining fields if needed
        existingItem.Type = newItem.Type;
        existingItem.Location = newItem.Location;
        existingItem.Status = newItem.Status;
        existingItem.Supplier = newItem.Supplier;
        existingItem.PurchaseDate = newItem.PurchaseDate;

        _context.items.Update(existingItem);
        await _context.SaveChangesAsync();
        return Ok(existingItem);
    }

    _context.items.Add(newItem);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetItem), new { id = newItem.Id }, newItem);
}


        [HttpPut("{Id}")]
        public async Task<IActionResult> UpadateItem(int Id, Item item){
            if(Id == item.Id){
                _context.Entry(item).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();

            }
            else{
                return BadRequest();
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id){

            var item = await _context.items.FindAsync(Id);

            if(item == null){
                return NotFound();
            }

            _context.items.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }




    }
}
