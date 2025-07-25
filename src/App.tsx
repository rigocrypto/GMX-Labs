@@ .. @@
 import { useState } from 'react';
 import BiometricLogin from './components/BiometricLogin';
 import Dashboard from './components/Dashboard';
+import Logo from './components/Logo';
 
 function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
@@ .. @@
   return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
+      {/* Loading Screen */}
+      {!isAuthenticated && (
+        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
+          <div className="text-center">
+            <Logo size="xl" className="mx-auto mb-4 animate-pulse" />
+            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto animate-pulse"></div>
+          </div>
+        </div>
+      )}
+      
       {!isAuthenticated ? (
         <BiometricLogin onAuthenticate={() => setIsAuthenticated(true)} />
       ) : (