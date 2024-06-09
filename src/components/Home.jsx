import { Outlet } from "react-router-dom";

function Home() {
    return (
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/06/10/82/87/240_F_610828765_STW3xaoGKbmt2WOMeuuQWsaDMz8Zum7f.jpg')`,
          minHeight: '100vh',
        }}
      >
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white bg-opacity-80 shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h1 className="text-3xl font-bold mb-4">Welcome to Techno System</h1>
              <p className="text-gray-700 leading-relaxed">
                We are Here to Solve your Problem
              </p>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    );
  }
  
  export default Home;
  