import HeadLines from "@/components/HeadLines";
import Title from "@/components/Title";
import DetailsNews from "@/components/news/DetailsNews";
import DetailsNewsCol from "@/components/news/DetailsNewsCol";
import DetailsNewsRow from "@/components/news/DetailsNewsRow";
import LatestNews from "@/components/news/LatestNews";
import PopularNews from "@/components/news/PopularNews";
import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
import NewsCard from "@/components/news/items/NewsCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/config";

const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 5,
    },
  });

  let news = await news_data?.json();

  news = news.news || {}
  
  return (
    <div>
      <main>
        <HeadLines news={news} />
        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <LatestNews news={news["Milan"] || []} />
              </div>
              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="Juventus" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    {news["Juventus"] && news["Juventus"].length > 0 ? (
                      news["Juventus"].map((item, i) => {
                        if (i < 4) {
                          return <SimpleNewsCard item={item} key={i} />;
                        }
                      })
                    ) : (
                      <div className="col-span-2 text-center py-8 text-gray-500">
                        Няма новини за Juventus в момента
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <PopularNews type="Popular news"  news={news["Lazio"] || []} />
            {/* first section */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  {news["Roma"] && news["Roma"].length > 0 ? (
                    <DetailsNewsRow
                      news={news["Roma"]}
                      category="Roma"
                      type="details-news"
                    />
                  ) : (
                    <div className="w-full bg-white p-8 text-center text-gray-500">
                      Няма новини за Roma в момента
                    </div>
                  )}
                  {news["Napoli"] && news["Napoli"].length > 0 ? (
                    <DetailsNews news={news["Napoli"]}
                      category="Napoli"  />
                  ) : (
                    <div className="w-full bg-white p-8 text-center text-gray-500">
                      Няма новини за Napoli в момента
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-4/12">
                  {news["Milan"] && news["Milan"].length > 0 ? (
                    <DetailsNewsCol
                      news={news["Milan"]}
                      category="Milan"
                    />
                  ) : (
                    <div className="w-full bg-white p-8 text-center text-gray-500">
                      Няма новини за Milan в момента
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 2nd section */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  {
                    <div className="pr-2">
                    {news["Milan"] && news["Milan"].length > 0 ? (
                      <DetailsNewsCol
                        news={news["Milan"]}
                        category="Inter"
                      />
                    ) : (
                      <div className="w-full bg-white p-8 text-center text-gray-500">
                        Няма новини за Inter в момента
                      </div>
                    )}
                  </div>
                  }
                </div>
                <div className="w-full lg:w-8/12">
                  <div className="pl-2">
                    {news["Lazio"] && news["Lazio"].length > 0 ? (
                      <DetailsNewsRow
                        news={news["Lazio"]}
                        category="Lazio"
                        type="details-news"
                      />
                    ) : (
                      <div className="w-full bg-white p-8 text-center text-gray-500">
                        Няма новини за Lazio в момента
                      </div>
                    )}
                    {news["Milan"] && news["Milan"].length > 0 ? (
                      <DetailsNews news={news["Milan"]}
                      category="Fiorentina"
                      />
                    ) : (
                      <div className="w-full bg-white p-8 text-center text-gray-500">
                        Няма новини за Fiorentina в момента
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* 3rd section */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  <div>
                    {news["Juventus"] && news["Juventus"].length > 0 ? (
                      <DetailsNewsRow
                        news={news["Juventus"]}
                        category="Juventus"
                        type="details-news"
                      />
                    ) : (
                      <div className="w-full bg-white p-8 text-center text-gray-500">
                        Няма новини за Juventus в момента
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-4/12">
                  <div className="pl-2">
                    <Title title="Recent news" />
                    <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                      {news['Roma'] && news['Roma'].length > 0 ? (
                        news['Roma'].map((item, i) => (
                          <NewsCard item={item} key={i} />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          Няма новини за Roma в момента
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Home;
