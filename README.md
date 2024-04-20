# Starbase-tools code

This repository contains code for the Starbase-tools project https://starbase-tools.com. The project is a collection of tools for the Starbase game by Frozenbyte with the goal of making ship and capship designing easier

## Intent

The goal of this repository is to provide a way for the community to contribute to the project. The project is open source and the code is available for anyone to see.

## Contributing

Contributing is very welcomed, in order to do so, I invite you to contact me on the discord server of the project in the `starbase-tools` channel: https://discord.gg/cN8tBWnWxr

You may also do a pull request on this repository, but I would recommend discussing the changes before doing so to avoid working on the same part as someone else or to avoid working on something that would not be accepted.

## Repository structure

As you will see, not the entire website is this repository.

The parts that are made public and available in this repository is the code that is used for the calculators of the website and the translations.

### The calculator_code directory
This directory contains all the code used to compute the values for the ships and cap ships

The subdirectories are as follows :
- capships : the capship calculator as seen here : https://starbase-tools.com/capship_price_calc
- cards : the modular thruster and generator system
- ship : the ship calculator as seen here : https://starbase-tools.com/ship_calculator
- values : the raw values used by all the calculators, they are shown in https://starbase-tools.com/values
- thruster_optimisation : the calculator that allows you to find the best suited thruster for a given situation. https://starbase-tools.com/thruster_optimisation

### The locales directory

Currently, the website is available in two languages : English and French. The locales directory contains all the text used in the website. The text is separated by language and by page.

Those are the two languages that are managed as those are the two languages I am fluent in.

Adding another language is possible but please do contact me first about it.