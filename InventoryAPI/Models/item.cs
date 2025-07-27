namespace InventoryAPI.Models
{
    public class Item
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string? Type { get; set; }
    public string? Location { get; set; }
    public string? Status { get; set; }
    public string? Supplier { get; set; }
    public DateTime PurchaseDate { get; set; }
}

    
}

