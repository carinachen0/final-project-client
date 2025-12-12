/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <h2>Thank you for visiting our campus management system page!</h2>
      <h3>Note: many areas to improve on but this is the core</h3>
      <img 
        src="https://wallpapers.com/images/high/anime-school-scenery-students-in-campus-wop7nas26xbkdhv0.webp" 
        alt="Anime school scenery with students on campus" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }} 
      />
    </div>
  );    
}

export default HomePageView;