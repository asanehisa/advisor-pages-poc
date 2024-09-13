import { ActivityResponse, GetActivitiesParams } from "../types/hearsay";

export async function getActivities({
  orgId = "1732",
  assetType = "third_party_site",
  assetId = "2393541",
}: GetActivitiesParams): Promise<ActivityResponse> {
  const url = new URL(
    `https://api.hearsaysocial.com/v1/org/${orgId}/activities/`
  );
  url.searchParams.append("asset_type", assetType);
  url.searchParams.append("asset_id", assetId);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "x-auth-token": HEARSAY_AUTH_TOKEN || "",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}
