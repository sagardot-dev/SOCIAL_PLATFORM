import { createResponse } from "@/lib/api-type/server";
import { HttpStatus, ResponseTitle } from "@/lib/api-type/types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_BUCKET!;

const client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.KEY_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECERT_KEY!,
  },
});

export async function POST(req: Request) {
  const { fileName, ext } = await req.json();

  if (!fileName || !ext) return;

  const FileName = `uploads-${fileName}-${crypto.randomUUID()}.${ext}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: FileName,
    ContentType: `image/${ext}`,
  });
  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "get sign url successfully",
        url
      ),
      {
        status: HttpStatus.CREATED,
      }
    );
  } catch (error: unknown) {
    console.log(error);
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        "server error while getting signurl",
        error
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
