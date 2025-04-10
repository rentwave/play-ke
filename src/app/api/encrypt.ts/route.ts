// import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secretKey = process.env.ENCRYPTION_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Encryption key is missing!" },
      { status: 500 }
    );
  }

  try {
    const { data } = await req.json();
    const encryptedData = data;
    // CryptoJS.AES.encrypt(
    //   JSON.stringify(data),
    //   secretKey
    // ).toString();

    return NextResponse.json({ encryptedData });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
