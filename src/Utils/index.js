export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false
    // so if no currentUSer, or if there is one but it lacks more than one user role (array is ===1), then return false, thus protecting the page
    const { userRoles } = currentUser
    if (userRoles.includes('admin')) { //check if the aforementioned array contains admin, then protect based on that
        return true
    } else {
        return false
    }

}