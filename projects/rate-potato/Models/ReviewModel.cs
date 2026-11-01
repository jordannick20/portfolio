using DotNetEnv;
using MySqlConnector;

namespace Boilerplate.Models;

public class ReviewModel
{
    private string CONNECTION_STRING;

    public ReviewModel()
    {
        Env.Load();
        CONNECTION_STRING = Env.GetString("CONNECTION_STRING");
    }

    public List<Review> Reviews { get; set; } = new List<Review>();

    public void GetReviews()
    {
        using var connection = new MySqlConnection(CONNECTION_STRING);

        Reviews.Clear();

        connection.Open();

        using var command = connection.CreateCommand();
        command.CommandText = "SELECT * FROM tblreview ORDER BY id DESC";

        using var reader = command.ExecuteReader();

        while (reader.Read())
        {
            Reviews.Add(new Review
            {
                Id = reader.GetInt32("id"),
                Rating = reader.GetInt32("rating"),
                First = reader.GetString("first"),
                Last = reader.GetString("last"),
                Comment = reader.GetString("comment")

            });
        }
    }

    public void AddReview(Review review)
    {

        using var Connection = new MySqlConnection(CONNECTION_STRING);

        Connection.Open();

        using var Command = Connection.CreateCommand();

        Command.CommandText = "INSERT INTO tblreview (rating,first,last,comment) VALUES (@rating,@first,@last,@comment)";

        Command.Parameters.AddWithValue("@rating", review.Rating);
        Command.Parameters.AddWithValue("@first", review.First);
        Command.Parameters.AddWithValue("@last", review.Last);
        Command.Parameters.AddWithValue("@comment", review.Comment);

        Command.ExecuteNonQuery();

    }

}