// changed completely from IPFS

import { useStorageUpload } from "@thirdweb-dev/react";
import { convertIPFSUriToUrl } from "./helpers";

export async function storeFiles(files: any) {
  const { mutateAsync: upload } = useStorageUpload();
  const uris = await upload({ data: Array.from(files) });
  return convertIPFSUriToUrl(uris[0]);
}