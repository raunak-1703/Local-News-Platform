
const calculateEngagementOverTime = (posts) => {
    const engagementMap = new Map();

    posts.forEach(post => {
        // Format the date to YYYY-MM-DD
        const dateKey = post.createdAt.toISOString().split('T')[0];
        
        // Define engagement for this post (Upvotes + Comments)
        const postEngagement = (post.upvoteCount || 0) + (post.commentsCount || 0);

        // Aggregate by date
        const currentEngagement = engagementMap.get(dateKey) || 0;
        engagementMap.set(dateKey, currentEngagement + postEngagement);
    });

    // Convert the Map to the required array format
    const engagementArray = Array.from(engagementMap, ([date, engagement]) => ({
        date,
        engagement
    }));
    
    // Sort by date chronologically
    engagementArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    return engagementArray;
};

export default calculateEngagementOverTime