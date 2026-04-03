export default async function handler(req, res) {
    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ error: "Vehicle number required" });
    }

    try {
        const url = `https://ayaanmods.site/vehicle.php?key=annonymousvehicle&number=${number}`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            return res.status(500).json({ error: "Invalid JSON from API" });
        }

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}
