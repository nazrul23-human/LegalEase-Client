export default function Avatar({ user }) {

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : "U";
    };

    const avatar = user?.photoURL || user?.image;

    return (
        <>
            {avatar ? (
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border"
                />
            ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {getInitial(user?.name)}
                </div>
            )}
        </>
    );
}