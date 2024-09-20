import {
  ActivityResponse,
  CreateLeadParams,
  GetActivitiesParams,
} from "../types/hearsay";

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

export async function createLead(
  orgId: string,
  hearsaySlug: string,
  params: CreateLeadParams
): Promise<any> {
  const url = `https://sites.prod.hearsaysocial.com/v2/org/${orgId}/contact/${hearsaySlug}`;
  const headers = {
    "x-auth-token": HEARSAY_AUTH_TOKEN || "",
    "Content-Type": "application/json",
  };

  const body = {
    contactMethod: params.contactMethod,
    firstName: params.firstName,
    lastName: params.lastName,
    themeId: params.themeId || "1237",
    email: params.email,
    phone: params.phone,
    message: params.message,
    optin: params.optin ?? true,
    postalCode: params.postalCode,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
}
