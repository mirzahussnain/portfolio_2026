import { collection, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

// Hook to Listen to Views (Admin Dashboard)
export const useViewCount = (isAdmin = false) => {
  const [data, setData] = useState({
    views: 0,
    weekly: 0,
    trend: 0,
    loading: true,
  });

  useEffect(() => {
    const docRef=doc(db, "stats", "portfolio-metrics")
    const unsubscribe = onSnapshot(
      docRef, // 2. Success Callback
      (docSnap) => {
        if (docSnap.exists()) {
          const fullData = docSnap.data();
          const viewStats = fullData.views || {};
          const totalViews = viewStats.count || 0;

          // --- ADMIN LOGIC ---
          if (isAdmin) {
            const lastDate =
              viewStats.last_snapshot_date?.toDate() || new Date();
            const lastCount = viewStats.last_snapshot_count || 0;
            const previousWeekly = viewStats.weekly_views || 1;

            const now = new Date();
            const daysDiff =
              (now.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);

            if (daysDiff >= 7) {
              const newWeeklyViews = totalViews - lastCount;
              const trend = Math.round(
                ((newWeeklyViews - previousWeekly) / previousWeekly) * 100
              );

              updateDoc(docRef, {
                "views.last_snapshot_date": Timestamp.now(),
                "views.last_snapshot_count": totalViews,
                "views.weekly_views": newWeeklyViews,
                "views.trend_percentage": trend,
              }).catch((err) =>
                console.warn("Failed to update stats:", err.message)
              );
            }
          }
          // -------------------

          const currentWeekViews =
            totalViews - (viewStats.last_snapshot_count || 0);

          setData({
            views: totalViews,
            weekly: currentWeekViews,
            trend: viewStats.trend_percentage || 0,
            loading: false,
          });
        }
      },
      // 3. 🛡️ ERROR CALLBACK (Crucial for Logout)
      (error) => {
        // This catches "Missing or insufficient permissions" when  logout
        console.log(
          "View listener stopped (likely logged out):",
          error.message
        );
        // We stop loading so the UI doesn't hang if it's still mounted
        setData((prev) => ({ ...prev, loading: false }));
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  return data;
};

export const useInboxCount = () => {
  const [count, setCount] = useState(0);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Reference the 'messages' collection
    const collectionRef = collection(db, "messages"); 

    // 2. Listen to real-time updates
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setCount(snapshot.size); // Total messages
      
      // Calculate unread
    
      const unreadCount = snapshot.docs.filter(doc => !doc.data().read).length;
      setUnread(unreadCount);
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { count, unread, loading };
};