import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@formbricks/lib/authOptions";
import { getResponseCountBySurveyId } from "@formbricks/lib/response/service";
import { getSurvey } from "@formbricks/lib/survey/service";

type Props = {
  params: { surveyId: string; environmentId: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const session = await getServerSession(authOptions);
  const survey = await getSurvey(params.surveyId);
  const responseCount = await getResponseCountBySurveyId(params.surveyId);

  if (session) {
    return {
      title: `${responseCount} Responses | ${survey?.name} Results`,
    };
  }
  return {
    title: "",
  };
};

export default async function SurveyLayout({ children }) {
  return <>{children}</>;
}
