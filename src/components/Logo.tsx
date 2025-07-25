@@ .. @@
 const Logo = ({ size = 'md', className = '' }: LogoProps) => {
   const sizeClasses = {
-    sm: 'w-8 h-8',
-    md: 'w-12 h-12',
-    lg: 'w-16 h-16',
-    xl: 'w-24 h-24'
+    sm: 'w-12 h-12',
+    md: 'w-16 h-16',
+    lg: 'w-24 h-24',
+    xl: 'w-32 h-32'
   };
 
   return (
     <div className={`relative ${sizeClasses[size]} ${className}`}>
-      <div className="absolute inset-0 bg-gradient-to-br from-gold via-sapphire to-gold rounded-lg opacity-20 blur-sm animate-pulse"></div>
-      <div className="relative w-full h-full bg-gradient-to-br from-gold to-sapphire rounded-lg flex items-center justify-center shadow-lg shadow-gold/20">
-        <span className="text-black font-bold text-lg font-orbitron">L</span>
-      </div>
+      <img 
+        src="/LuxChain Logo.jpg" 
+        alt="LuxChain Logo" 
+        className="w-full h-full object-contain filter drop-shadow-lg"
+      />
+      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-sapphire/10 rounded-lg animate-pulse"></div>
     </div>
   );
 };