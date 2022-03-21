
public class Publisher
{
    public event EventHandler<char> OnKeyPressed;

    public void Run()
    {
        char pressed_key = Console.ReadKey().KeyChar;
        while (pressed_key != 'c' && pressed_key != 'C')
        {
            OnKeyPressed?.Invoke(this, pressed_key);
            pressed_key = Console.ReadKey().KeyChar;
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        var reader = new Publisher();
        reader.OnKeyPressed += PressedKeyHandler;
        reader.Run();
    }
    public static void PressedKeyHandler(object sender, char pressed_key)
    {
        Console.WriteLine(" pressed key: " + pressed_key);
    }
}