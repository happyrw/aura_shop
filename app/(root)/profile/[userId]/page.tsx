import React from 'react'

const ProfilePage = ({ params }: { params: { userId: string } }) => {
    const userId = params.userId;
    return (
        <div>{userId}</div>
    )
}

export default ProfilePage