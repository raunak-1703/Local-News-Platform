export const calculatedTrendingScore = (post)=>{
    const hoursSincePost = (Date.now() - new Date(post.createdAt)) / 1000*3600
    return (
        post.upvoteCount *2 + post.commentsCount - hoursSincePost*0.1
    )
}