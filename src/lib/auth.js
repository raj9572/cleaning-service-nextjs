import { verifyToken } from "@/lib/jwt";

export const getAuthUser = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    return verifyToken(token); // { id, email, role }
  } catch {
    return null;
  }
};

export const requireAdmin = (req) => {
  const user = getAuthUser(req);

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "ADMIN") {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  return user;
};
