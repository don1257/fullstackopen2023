const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
    const totalLikes = blogs.reduce((acc, curr) => {
        return acc + curr.likes;
    }, 0);
    return totalLikes
}

module.exports = {
    dummy, totalLikes
}
