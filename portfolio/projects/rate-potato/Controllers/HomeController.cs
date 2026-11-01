using Microsoft.AspNetCore.Mvc;
using Boilerplate.Models;

namespace Boilerplate.Controllers;

public class HomeController : Controller
{

    public IActionResult Index()
    {
        var model = new ReviewModel();
        model.GetReviews();
        return View(model);
    }

    [HttpPost]
    public IActionResult AddReview(Review review)
    {
        if (review.Comment == null)
        {
            return RedirectToAction("Index");
        }

        if (review.First == null)
        {
            review.First = "Anonyomous";
            review.Last = "";
        }
        if (review.Last == null)
        {
            review.First = "Anonyomous";
            review.Last = "";
        }
        var model = new ReviewModel();
        model.AddReview(review);
        model.GetReviews();
        return RedirectToAction("Index", model);

    }

}
