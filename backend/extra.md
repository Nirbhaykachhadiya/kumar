backend  


export const generatePdfBack = asyncHandler(async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Set to false for debugging
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
   const response= await page.goto("http://localhost:5173/pdf/", {
      waitUntil: "networkidle2",
      timeOut: 60000,
    });

    console.log(`Navigated to: ${response.url()}`);
    console.log(`Status: ${response.status()}`);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    console.log(pdf);

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=download.pdf");
    res.send(pdf);
  } catch (error) {
    console.log(error);
  }
});


frontend

const [downloadUrl, setDownloadUrl] = useState(null);



const generatePdfBack = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/users/generatePdfBack",
        { responseType: "blob" },
        { withCredentials: true }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownloadUrl(url);
      //setAddToCartQues(res.data.data);
      console.log("fetch generatePdfBack successfully", res);
    } catch (error) {
      console.log("fetch generatePdfBack Unsuccessful", error.message);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      // Create a link element
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "download.pdf"); // Specify the file name
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    } else {
      console.error("No download URL available");
    }
  };
