# Instructions

## Objective

You've been given a JSON API that contains a list of movies Evan likes and a bare-bones website to present the data. The website currently looks like this:

![starting screen](http://i.imgur.com/Zc72Euv.png)

You've been tasked with delivering the following requirements so as to make the information in the provided API consumable by individuals other than Evan.

## Requirements

1. Display the list of movies on the page. Movies should be listed in alphabetical order.

    ![display titles](http://i.imgur.com/y9uwdQw.png)

1. When a user clicks on the title of the movie, they should be redirected to the Rotten Tomatoes page for that movie.

    ![go to RT page for the movie](http://i.imgur.com/EYia9xk.gif)

1. Display the year the movie was released next to the title.

    ![display year next to title](http://i.imgur.com/J9eBexT.png)

1. Display the Rotten Tomatoes rating next to each movie title in the list. This value should be displayed as a percentage.

    ![display the score next to the title](http://i.imgur.com/B9kFGQe.png)

1. In order to not spam our API, cache the responses in the browsers [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API). Do not make network requests to the API if there is a cached version of the response available.

    ![use local storage](http://i.imgur.com/cD4xmbQ.gif)

1. Allow searching by title. Only filter results if 2 or more characters are entered in the search box. The list below should update when the value of the search box changes.

    ![filter by title](http://i.imgur.com/zkbLoS3.gif)

    Search should

    - be case-insensitive
    - exact match on any substring in `title`

1. Allow filtering by decade. Decade options should be computed from the data, *not hard-coded*. Selecting a decade should filter the list to show all movies from that decade.

    ![filter by decade](http://i.imgur.com/aGhZLHS.gif)

    **NOTE**: This filter should be additive to the title search box above it.

1. When a movie row is clicked, expand the row to show what Evan says about the movie. Clicking the row again should collapse it.

    ![expand row when clicked](http://i.imgur.com/nSBORZw.gif)

    **NOTE**: Clicking on the title should still take you to the Rotten Tomatoes page, but ***should not*** expand the row before the user leaves the page.

    ![clicking link should not expand row but open RT page](http://i.imgur.com/GL8X3sI.gif)

1. Display the movie art next to the review. The image files are provided by the API.

    ![show image next to review](http://i.imgur.com/UErNiAB.png)

1. All of the above features should look nice. Feel free to borrow styling from the screenshots or improve upon them. Do not worry about cross-browser compatibility; the only browser you need to concern yourself with is the latest version of Google Chrome.

## Resources Provided

You've been given a working [rollup](https://rollupjs.org/) setup, a basic application structure, and a JSON API.

You can accomplish all of the above with just `React`—no need to bring in any other libraries.

## Success Criteria

1. Your solution delivers all the requirements above.
1. Your code is thoughtful, stylistically consistent, and easily extensible.
1. You submit your solution within 24-48 hours of receiving this assignment.

This list is not exhaustive, but it represents the bulk of what comprises a successful solution.
