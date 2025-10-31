import { Session, User } from '@supabase/supabase-js';
import { GeneralStatistis, UserProfile, WebsiteInfo } from './types.ts';
import { isArrWithContent, isEmptyObj } from './globalFuncs.ts';
import { supabase } from './SupabaseClient.ts';


export async function setSupabaseSession(accessToken: string | undefined, refreshToken: string | undefined): Promise<{user: User | null, session: Session | null} | null>{
  let result = null;

  if (accessToken && refreshToken) {
    const { data: setData, error: setError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    console.log('SetSession:', setData, setError);

    const { data: getData, error: getError } = await supabase.auth.getSession();
    console.log('GetSession:', getData, getError);

    if (!isEmptyObj(setData)&& setData.session == null && setData.user == null) {
    //   throw setError;
      await supabase.auth.signOut();
    }

    if (!isEmptyObj(setData) && !setError){
      result = setData;
    }
  }

  return result;
}

export async function getDailyWeeklyVisitsInfo(userId: string, siteUrl: string) {
  let result = null;
  let currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD;
  let urlId = await getUserUrlId(siteUrl, userId);

  if (urlId){

    const { data, error } = await supabase.rpc('get_daily_weekly_visits', {
        p_user_id: userId,
        p_check_date: currentDate,
        p_url_id: urlId
    });
    if (error) throw error;

    if (isArrWithContent(data)){
      result = data[0];
      console.log('getDailyWeeklyVisitsInfo:  ', result)
    }

  }
  return result;
}

export async function supabaseSignIn(redirectUrl: string){
    // `chrome-extension://${browser.runtime.id}/welcome.html`
    return await supabase.auth.signInWithOAuth({
                            provider: 'google',
                            options: {
                                redirectTo: redirectUrl,
                                scopes: 'email profile',
                                flowType: 'pkce'
                            }
                        })
}

export async function supabaseSignOut(){
    return await supabase.auth.signOut();
}


// WebsiteInfo
export async function tryToAddUserUrl(websiteInfo: any, userId: string = ""){

    let result = {success: true};

    if (!isEmptyObj(websiteInfo) && userId != ""){
      let newUserUrl = {};
      newUserUrl.url = websiteInfo?.url;
      newUserUrl.icon = websiteInfo?.icon;
      newUserUrl.title = websiteInfo?.title;
      newUserUrl.category = websiteInfo?.category;
      newUserUrl.user_id = userId;
      // let tryCreateUserUrl = await supabase.from('user_urls').insert(newUserUrl);

      const { data, error } = await supabase.from('user_urls').upsert(
        newUserUrl,
        {
          onConflict: 'url, user_id'
        }
      );

      if (error) {
        result = {success: false};
        console.error('Error performing upsert:', error, newUserUrl);
      } else {
        console.log('Upsert successful:', data);
      }
    }

    return result;
}

async function getUserUrlId(siteUrl: string, userId: string) {
    let result = null;
    // const {data} = await supabase.from('user_urls').select('*');
    const {data} = await supabase.from('user_urls').select('id').eq('user_id', userId).eq('url', siteUrl);
    console.log("user urls: ", data);
    if (!isEmptyObj(data) && isArrWithContent(data)){
        result = data[0].id;
    }

    return result;
}

export async function getTotalDaysScanning(userId: string) {
    let result = 1;

    const { data, error } = await supabase.rpc('get_activity_days_number', {
         p_user_id: userId
    });
    // if without params
    // const { data, error } = await supabase.rpc('get_activity_days_number');

    if (error) throw error;
    result = data;
    return result;
}


export async function getGeneralStatistics(userId: string): Promise<GeneralStatistis> {
    let result: GeneralStatistis = {todaySitesVisited: 1, allSitesVisited: 1};
    let currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD;
    // // '95699537-255a-4235-9bba-0b5331dac9de', '2025-10-26'
    // const { data, error } = await supabase.rpc('get_scans_statistics', {
    //     p_user_id: userId,
    //     p_check_date:  currentDate
    // });
    // // if without params
    // // const { data, error } = await supabase.rpc('get_activity_days_number');

    // if (error) throw error;
    // // result = data;
    // console.log('getGeneralStatistics: ', data)
    // '95699537-255a-4235-9bba-0b5331dac9de'
    const { data, error } = await supabase.from('urls_visits').select('*').eq('user_id', userId.trim()).eq('visit_date', currentDate);
    // let todayUniqueSites = await supabase.from('user_urls').select('*').eq('user_id', userId).eq('visit_date', currentDate);

    if (error) throw error;
    let todayUniqueSites = data;
    console.log("todayUniqueSites :", todayUniqueSites);

    let allUniqueSites = await supabase
      .from('urls_visits')
      .select('user_url_id', { distinct: true })
      .eq('user_id', userId.trim());

    allUniqueSites = !isEmptyObj(allUniqueSites) ? allUniqueSites.data : [];

    if (isArrWithContent(todayUniqueSites)){
      result.todaySitesVisited = todayUniqueSites.length;
      result.allSitesVisited = isArrWithContent(allUniqueSites) ? allUniqueSites.length : todayUniqueSites.length;
    }
    return result;
}

export async function tryToUpdateUrlVisits(siteUrl: text, userId: text, durationSec: number, visitsCounter: number){
    let urlId = await getUserUrlId(siteUrl, userId);

    if (urlId){
        // const { data, error } = await supabase
        //     .from('urls_visits')
        //     .upsert({
        //         user_id: userId,
        //         user_url_id: urlId,
        //         visit_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
        //         duration_sec: durationSec,
        //         visit_count: visitsCounter
        //     },
        //     {
        //         onConflict: 'user_id, user_url_id, visit_date'
        //     });
        let currentDate = new Date().toISOString().slice(0, 10);
        const { data, error } = await supabase.rpc('add_visit_duration', {
            p_user_id: userId,
            p_user_url_id: urlId,
            p_visit_date: currentDate,
            p_additional_sec: durationSec
        });

        if (error) {
            // result = {success: false};
            console.error('Error performing upsert:', error);
        } else {
            console.log('Upsert successful:', data);
        }
    }
    else {
        console.error("There no url " + siteUrl + " in data table user_urls");
    }

}

export async function getCategoryByDomain(siteUrl: text){
  let result = null;

  const { data, error } = await supabase.rpc('get_site_category', {
    p_domain: siteUrl
  });

  // let currentSession  = await supabase.auth.getSession();
  // console.log('getCategoryByDomain currentSession:', currentSession);

  if (error) {
    // result = {success: false};
    console.error('Error getCategoryByDomain:', error);
  }
  else {
    console.log('getCategoryByDomain successful:', data);
    if (isArrWithContent(data)){
      result = data[0];
    }
  }

  return result;
}

export async function getUserVisitedUrls(userId: string = "", periodStart: string, periodEnd: string): Promise<any> {
  let result = null;

  if (userId != "") {
    // let currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD;
    // const { data, error } = await supabase.from('urls_visits').select('*').eq('user_id', userId.trim()).eq('visit_date', currentDate);

    // if (error) throw error;
    // let todayUniqueSites = data;
    // console.log("todayUniqueSites :", todayUniqueSites);
    // result = todayUniqueSites;
    // get_visits_by_user_and_range(
    //   '37f230e9-94bf-4d6a-860c-0da837f915f7',
    //   '2025-10-29',
    //   '2025-10-29'
    // )
    const { data, error } = await supabase.rpc('get_visits_by_user_and_range', {
        p_user_id: userId,
        p_start: periodStart,
        p_end: periodEnd
    });
    if (error) throw error;

    if (isArrWithContent(data)){
      result = data;
      console.log('getUserVisitedUrls:  ', result)
    }
  }

  return result;
}

//   await supabase.auth.setSession({
//     access_token: currentSession.access_token,
//     refresh_token: currentSession.refresh_token
//   })
//   supabase.auth.getSession().then(({data: {session}}) => {
//       console.log('SB session:', session);
//   })
export default supabase;