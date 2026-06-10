import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const brainDir = "/Users/mr.ghost/.gemini/antigravity-ide/brain/9789907c-4eb1-473e-a501-b1a2d28127be";
    const publicAssetsDir = "/Users/mr.ghost/Documents/dental-clinic-template/public/assets";
    
    if (!fs.existsSync(publicAssetsDir)) {
      fs.mkdirSync(publicAssetsDir, { recursive: true });
    }
    
    // Copy Kristine Marcial
    fs.copyFileSync(
      path.join(brainDir, "dentist_kristine_marcial_1780989106317.png"),
      path.join(publicAssetsDir, "dentist_kristine_marcial.png")
    );
    
    // Copy Kaelen Daulo
    fs.copyFileSync(
      path.join(brainDir, "dentist_kaelen_daulo_1780989127036.png"),
      path.join(publicAssetsDir, "dentist_kaelen_daulo.png")
    );
    
    return NextResponse.json({ success: true, message: "Images copied successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
