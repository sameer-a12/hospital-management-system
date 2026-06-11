export default async function adminAuth(req, res, next) {
  try {
    const { userId } = await req.auth();


    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (userId !== process.env.ADMIN_CLERK_ID) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}