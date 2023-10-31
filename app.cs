using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

class Program
{
    private const string DictionaryFilePath = "data/dictionary.json";
    private static Dictionary<string, WordEntry> dictionary;

    [Serializable]
    class WordEntry
    {
        public string Meaning { get; set; }
        public DateTime AddedAt { get; set; }
    }

    static void Main(string[] args)
    {
        InitializeDictionary();

        Console.WriteLine("Synonyms Dictionary App");
        Console.WriteLine("1. Search for a word");
        Console.WriteLine("2. Add a new word");
        Console.WriteLine("3. Exit");

        bool exit = false;
        while (!exit)
        {
            Console.Write("Enter your choice: ");
            if (int.TryParse(Console.ReadLine(), out int choice))
            {
                switch (choice)
                {
                    case 1:
                        SearchWord();
                        break;
                    case 2:
                        AddWord();
                        break;
                    case 3:
                        exit = true;
                        break;
                    default:
                        Console.WriteLine("Invalid choice. Please try again.");
                        break;
                }
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter a number.");
            }
        }

        SaveDictionary();
    }

    static void InitializeDictionary()
    {
        if (File.Exists(DictionaryFilePath))
        {
            string jsonContent = File.ReadAllText(DictionaryFilePath);
            dictionary = JsonConvert.DeserializeObject<Dictionary<string, WordEntry>>(jsonContent);
        }
        else
        {
            dictionary = new Dictionary<string, WordEntry>();
        }
    }

    static void SearchWord()
    {
        Console.Write("Enter a word: ");
        string word = Console.ReadLine();

        if (dictionary.TryGetValue(word, out WordEntry entry))
        {
            Console.WriteLine($"Meaning of {word}: {entry.Meaning}");
            Console.WriteLine($"Added at: {entry.AddedAt}");
        }
        else
        {
            Console.WriteLine("Word not found in the dictionary.");
        }
    }

    static void AddWord()
    {
        Console.Write("Enter a new word: ");
        string word = Console.ReadLine();

        Console.Write($"Enter the meaning of {word}: ");
        string meaning = Console.ReadLine();

        dictionary[word] = new WordEntry
        {
            Meaning = meaning,
            AddedAt = DateTime.Now
        };
        Console.WriteLine($"Word '{word}' with meaning '{meaning}' added to the dictionary.");
    }

    static void SaveDictionary()
    {
        string jsonData = JsonConvert.SerializeObject(dictionary);
        File.WriteAllText(DictionaryFilePath, jsonData);
        Console.WriteLine("Dictionary saved successfully.");
    }
}
