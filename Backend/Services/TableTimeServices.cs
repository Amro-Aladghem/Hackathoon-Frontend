using Database.Entities;
using DTOs;
using Mscc.GenerativeAI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class TableTimeServices
    {
        public readonly AppDbContext _context;

        private GenerativeModel model;

        private Content systemInstruction = new Content("""
            You are an AI that must produce a study timetable entirely in HTML with no additional commentary or formatting. Your output should be a complete HTML document that starts with the <!DOCTYPE html> declaration and includes all necessary HTML, head, and body tags.The structure must be like that:
            
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>خطة دراسة 18.650 MIT - المقدمة</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 20px;
                        background-color: #f4f4f4;
                        direction: rtl;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: right;
                    }
                    th {
                        background-color: #0c4a6e;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    .break {
                        background-color: #e0f7fa;
                        font-style: italic;
                    }
                    .current-time {
                        font-weight: bold;
                        font-size: 1.1em;
                        margin-bottom: 10px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>خطة دراسة 18.650 MIT - المقدمة</h1>
                <p class="current-time">الوقت البدء: 2:33 مساءً</p>
                <table>
                    <thead>
                        <tr>
                            <th>الوقت</th>
                            <th>التاريخ</th>
                            <th>المدة</th>
                            <th>الموضوع</th>
                            <th>التركيز</th>
                            <th>فترات بومودورو</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            <td>2025/3/13</td>
                            <td>2:33 - 2:58 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>نظرة عامة على الدورة والتحفيز (الشرائح 1-10)</td>
                            <td>فهم أهداف الدورة، اللوجستيات، المتطلبات الأساسية، وسؤال "لماذا الإحصاء؟". استيعاب مفهوم العشوائية ودورها. التمييز بين الاحتمال والإحصاء.</td>
                            <td>1</td>
                        </tr>
                        <tr class="break">
                            <td>2:58 - 3:03 مساءً</td>
                            <td>5 دقائق</td>
                            <td>*استراحة*</td>
                            <td>استراحة قصيرة، تمدد، احصل على بعض الماء.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3:03 - 3:28 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>مراجعة الاحتمالات (الشرائح 11-14)</td>
                            <td>تحديث أساسيات الاحتمالات. فهم الأمثلة والتعريفات. التركيز على العمليات المعروفة (الاحتمال) مقابل العمليات غير المعروفة (الإحصاء).</td>
                            <td>1</td>
                        </tr>
                        <tr class="break">
                            <td>3:28 - 3:33 مساءً</td>
                            <td>5 دقائق</td>
                            <td>*استراحة*</td>
                            <td>استراحة قصيرة.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3:33 - 3:58 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>الإحصاء والنمذجة (الشرائح 15-16)</td>
                            <td>الفكرة الأساسية: العملية المعقدة = عملية بسيطة + ضوضاء عشوائية. الارتباط بالمشاكل الواقعية.</td>
                            <td>1</td>
                        </tr>
                        <tr class="break">
                            <td>3:58 - 4:03 مساءً</td>
                            <td>5 دقائق</td>
                            <td>*استراحة*</td>
                            <td>استراحة قصيرة.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4:03 - 4:28 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>مثال التقبيل (الاستدلال) (الشرائح 17-24)</td>
                            <td>العمل بعناية. فهم: إعداد المشكلة، تصميم التجربة، المقدر (متوسط العينة)، الافتراضات (متغير عشوائي، برنولي، الاستقلال). تحليل الافتراضات بشكل نقدي.</td>
                            <td>1</td>
                        </tr>
                        <tr class="break">
                            <td>4:28 - 4:33 مساءً</td>
                            <td>5 دقائق</td>
                            <td>*استراحة*</td>
                            <td>استراحة قصيرة.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4:33 - 4:58 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>LLN، CLT، والنتائج (الشرائح 25-29)</td>
                            <td>فهم LLN و CLT *في السياق*. كيف يبرران متوسط العينة ويمكّنان فترات الثقة.</td>
                            <td>1</td>
                        </tr>
                        <tr class="break">
                            <td>4:58 - 5:03 مساءً</td>
                            <td>5 دقائق</td>
                            <td>*استراحة*</td>
                            <td>استراحة قصيرة.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>5:03 - 5:28 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>متباينة هوفدينغ والتقارب (الشرائح 30-35)</td>
                            <td>هوفدينغ كبديل لـ CLT (العينات الصغيرة). مراجعة *أنواع* التقارب (a.s.، في الاحتمال، في التوزيع، في Lp). التركيز على *المفاهيم*.</td>
                            <td>1</td>
                        </tr>
                        <tr class="break">
                            <td>5:28 - 5:33 مساءً</td>
                            <td>5 دقائق</td>
                            <td>*استراحة*</td>
                            <td>استراحة قصيرة.</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>5:33 - 5:58 مساءً</td>
                            <td>25 دقيقة</td>
                            <td>مثال وقت الوصول (الشرائح 36-45)</td>
                            <td>التركيز على كيفية تطبيق طريقة دلتا ونظرية سلوتسكي، ومراجعة الخطوات المتوفرة.</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
            
            Do not include any text outside of the HTML code. Your output must contain only the HTML as shown, with no markdown formatting or commentary.
            The user will send to you (start time,Start date ,end Time , End date) based on these and the file you must change the values of start time,end time,dates,title and every thing,
            you must don't exeeds the end time , and you must follow the end date and finish with it ,
            if start date not equal end date you must divide the meterial of the file for small topics to cover the all the dates the end and start ,
            in this situation you must  determine a sleep time period between the different dates , you can put this time based on your opinoin location and the big of the 
            file.
            Note: don't use time like 23:40 no use only 11:40 pm and am ok .
            """);


        public TableTimeServices(AppDbContext context)
        {
            _context = context;

            var googleAI = new GoogleAI(apiKey: "");
            model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstruction);
        }

        public async Task<string> GenerateTheTimeTable(string FileURI,TimeTableRequestDTO requestDTO)
        {
            string promet = $"The start Date:{requestDTO.DateOfStart.Date},start time:{requestDTO.TimeOfStart}" +
                            $",end Date:{requestDTO.DateOfEnd.Date},end time:{requestDTO.TimeOfEnd}";

            var request = new GenerateContentRequest(promet);

            await request.AddMedia(FileURI);

            var response = await model.GenerateContent(request);

            return response.Text;
        }

    }
}
