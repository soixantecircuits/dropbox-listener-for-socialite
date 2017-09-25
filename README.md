# Project name

This tools is listening to a directory, all the new files in this directory will be upload to socialite via altruist

## 🌍 Installation

Clone this repository and run `npm install` when you're inside the repository

## ⚙ Configuration

This tools is using [standard-settings](https://github.com/soixantecircuits/standard-settings)
Here is an example of the settings you can fill with your parameters:
```
{
    "dp-listener": {
    "path" : the directory you want to listen,
    "maxParallel" : max number of uploads parallelized,
    "altruistAPIURL": Altruist API Url
    }
}
```
## 👋 Usage

Just upload or move files in the directory listened by dropbox-listener and it will create a bucket with your media.

## 📦 Dependencies

You need an altruist instance running.
