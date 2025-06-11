import { useState, useEffect } from "react";

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white z-50 transition-opacity duration-1000 ease-in-out">
      <div className="relative mb-6 group">
        <img 
          src="/src/assets/images/tomatoLogo.png" 
          alt="AgriLinked Logo" 
          className="w-40 animate-spin transition-all duration-1000 group-hover:scale-110" 
        />
        
        <div className="absolute -inset-4 rounded-full border-2 border-green-200 opacity-0 group-hover:opacity-100 pulse-slow transition-all duration-1000"></div>
      </div>
      
      <div className="h-20 flex items-center justify-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent tracking-tight mb-2 relative">
          <span className="relative overflow-hidden whitespace-nowrap">
            <span className="text-green-600 inline-block typing overflow-hidden whitespace-nowrap pr-1 border-r-4 border-green-400 [blink-caret_0.75s_step-end_infinite]">
              Agri<span className="text-[#FF6347]">Linked</span>
            </span>
          </span>
        </h1>
      </div>
      
      <p className="text-gray-500 text-lg fadeIn delay-500 mt-2">
        Connecting Agriculture to the Future
      </p>
      
      <div className="w-32 h-1 bg-green-100 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-green-500 rounded-full loading-bar"></div>
      </div>
    </div>
  );
}

function App({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}


export default App;