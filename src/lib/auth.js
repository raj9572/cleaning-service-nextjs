import { verifyToken } from "@/lib/jwt";

export const getAuthUser = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];
  return verifyToken(token); // returns payload {id, email, role}
};

export const requireAdmin = (req) => {
  const user = getAuthUser(req);

  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return user;
};
