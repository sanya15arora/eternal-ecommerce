const formatdate = (isODate) => {
    const date = new Date(isODate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
export default formatdate