# Faster Flash

*Faster Flash is a rapid flashcard creation and review app designed to help you master languages faster,
starting with Korean to English Translation*
\
\
This was a quick prototype I made in the span of about a week, with the goal of familiarizing myself with Next.js
and Supabase. Moreover, I handled all the user authentication and database management with Supabase.
I also utilized the krdict API for translation, as well as Material UI, Shadcn, and Framer Motion for frontend styling.
\
\
The idea behind the project was that it can take a long time to build flashcard sets to learn new languages.
For example, say that I want to learn Korean. Say that I see a new Korean word. In order to create a new flashcard
for this word, I would need to first get the English translation to make a flashcard using Quizlet, Anki, or some other
flashcard tool. However, with this app, you can enable auto-translations such that you only need to enter the
Korean word on the front of the flashcard, and the app will automatically translate and input the back-side for you.
\
\
The app only has Korean-to-English translation for now, but the fundamental idea could be applied and expanded for more
language combinations.
\
\
Because I utilized the free version of Supabase, the database will be put to sleep after 7 days of inactivity and 
permanently deleted after 30 more days of inactivity. As such, I included screenshots and gifs below to showcase the 
functionality of the app before the database goes down.
\
\
![Auto-translation example](/demo/translation.gif)
![Login Page](/demo/login_page.png)
![Home Page](/demo/home_page.png)
![Study Page](/demo/study_page.png)
![Library Page](/demo/library_page.png)
